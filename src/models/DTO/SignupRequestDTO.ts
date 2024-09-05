interface SignupRequestDTO {
  username: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  membership: string;
  mailList: boolean;
}

export default SignupRequestDTO;
