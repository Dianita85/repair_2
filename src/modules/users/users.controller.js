import { UserService } from './user.service.js';
import generateJWT from "../../config/plugin/generate-jwt.plugin.js"
import { catchAsync } from '../../common/errors/catchAsync.js';
import { AppError } from '../../common/errors/appError.js';
import { verifyPassword } from '../../config/plugin/encript-pass.plugin.js';




export const login = catchAsync(async (req, res,next)  => {
 

    const {email, password}= validateUser(req.body)

    const user = await UserService.findOneByEmails(email)

    if (!user){
      return next (new AppError('not found user', 404))
    
}

const  correctPassword = await verifyPassword(password, user.password)

if(!correctPassword){
  return next(new AppError('disabled credentials', 401))
}

const token = await generateJWT(user.id)

return res.status(200).json({
  token,
  user: {
    id: user.id,
    name:user.name,
  }
})

})



export const findAllUsers = catchAsync(async (req, res) => {
  try {
    const users = await UserService.findAll();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
});



export const createUser = catchAsync(async (req, res) => {
  try {
    const { name, email, password, role } = req.body;


    const user = await UserService.create({ name, email, password, role });


    const token = await generateJWT(user.id);

    return res.status(201).json({
      token,
      user:{
        id:user.id,
       name: user.name,
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
});



export const findOneUser = catchAsync(async (req, res) => {
 
    const { user} = req;
  
    return res.status(200).json(user);

});



export const updateUser = catchAsync(async (req, res) => {
  try {
    const { name,email } = req.body;
    const { user } = req;

     
    const userUpdate = await UserService.update(user, { name, email});

    return res.status(200).json(userUpdate)
  }catch (error) {

    return res.status(500).json({
      status: 'error',
      message: 'User not found',

    })
  }
    
   
});



export const deleteUser = catchAsync(async (req, res) => {
  try {
    const { user } = req;


    await UserService.delete(user);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
});
