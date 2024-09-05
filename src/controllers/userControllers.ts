import User from "../models/userModel";
import { Request, Response } from "express";

interface QueryParams {
  [key: string]: string | number | RegExp | undefined;
  username?: string | RegExp;
  name?: string;
  email?: string | RegExp | undefined;
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
}

async function getAllUsers(
  req: Request<unknown, unknown, unknown, QueryParams>,
  res: Response
) {
  try {
    // Build Query
    // 1A Filtering
    const queryObj: QueryParams = { ...req.query };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((item) => delete queryObj[item]);

    // If a name is specified in the query, use it
    if (queryObj.name && queryObj.username) {
      queryObj.username = new RegExp(queryObj.username, "i"); // 'i' makes it case insensitive
    }
    if (queryObj.email) {
      queryObj.email = new RegExp(queryObj.email, "i");
    }

    // // 1B Advanced Filtering
    // queryObj = JSON.stringify(queryObj).replace(
    //   /\b(gte|lte|gt|lt)\b/g,
    //   (match) => `$${match}`
    // );

    let query = User.find(queryObj);

    // 2 Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
      console.log(req.query.sort);
    } else {
      query = query.sort("-_id");
    }

    // 3 Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // 4 Pagination
    const page: number = req.query.page || 1;
    const limit: number = req.query.limit || 20;
    const skip: number = (page - 1) * limit;

    if (req.query.page) {
      const num = await User.countDocuments();
      if (skip >= num) throw new Error("Page Not Found");
    }

    query = query.skip(skip).limit(limit);

    // Execute Query
    const users = await query;

    res.status(200).json({
      status: "success",
      results: users.length,
      message: "getAllUsers requested!",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "fail", message: err });
  }
}

async function createUser(req: Request, res: Response) {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      message: "createUser requested!",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        id: req.params.id,
        message: "getUser requested!",
        data: {
          user,
        },
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "updateUser requested!",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      message: "getUser requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

async function editUserMain(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with that ID",
      });
    }

    const { username } = req.body;

    if (username !== user.username) {
      const dublicateUser = await User.findOne({ username: username });

      if (dublicateUser) {
        return res.status(400).json({
          status: "fail",
          message: "This username already exists",
        });
      }
    }

    await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "editUserMain requested!",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
}

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  editUserMain,
};
