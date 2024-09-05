import { findOne, create, findById } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import { sign, verify } from "jsonwebtoken";
import AppError from "../utils/AppError";
import { promisify } from "util";
import process from "process";
import { Request, Response, NextFunction } from "express";

const signToken = (id) =>
  sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const dublicateUsername = await findOne({ username: req.body.username });
    const dublicateEmail = await findOne({ email: req.body.email });

    console.log(dublicateUsername, dublicateEmail);

    if (dublicateUsername) {
      res.status(400).json({
        status: "fail",
        error: "This username is already taken.",
      });
      next(new AppError("This username is already taken.", 400));
    }
    if (dublicateEmail) {
      res.status(400).json({
        status: "fail",
        error: "This email is already taken.",
      });
      next(new AppError("This email is already taken.", 400));
    }

    const newUser = await create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      membership: req.body.membership,
      mailList: req.body.mailList,
    });

    // signing the token
    const token = signToken(newUser._id);

    // 201 for created
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // 1- Check if there's an email or pass in the request
    if (!email || !password) {
      return next(new AppError("Please provide an email or a password.", 400));
    }

    // 2- Check if there's user with this email
    // We're adding select with "+" on the pre of pass to add it to selection again
    const user = await findOne({ email: email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    // 3- Sign the login token.
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check if it's still there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 401 for unauthorized
    if (!token) {
      return next(new AppError("There's no token in the headers.", 401));
    }
    // 2) Verificate the token
    const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exist
    const currentUser = await findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError("The user of this token is not exist anymore.", 401)
      );
    }

    // Cancelled right now
    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(
    //     new AppError(
    //       "User changed the password recently. Try to login again.",
    //       401
    //     )
    //   );
    // }

    // Grant access to user
    req.user = currentUser; //! might be useful
    next();
  }
);

export function restrictTo(...roles) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("The user have no permission to access this route.", 403)
      );
    }
    next();
  };
}

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
