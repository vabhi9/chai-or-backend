import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //Get User Info from Frontend
  //validation - mot empty
  // check if user already Exist : username , email
  //ckeck for images , check for avatar
  // upload them to cloudinary, avatar
  //create user object - create entry in DB
  //remove password and refresh token field in response
  //check for user creation
  //return response

  const { fullName, email, userName, password } = req.body;
  console.log("email:", email, "fullName: ", fullName);

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields is Required");
  }

  const existedUser = User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User With username already Exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLoacaPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is Required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLoacaPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is Required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );



if(!createdUser){
  throw new ApiError(500 , "Something went wrong, while registring the User")
}



return res.status(201).json(
  new ApiResponse(200 , createdUser, "User Registered Successfully")
)





});

export { registerUser };
