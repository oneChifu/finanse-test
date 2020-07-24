import store from "@/store";
import { extend } from 'vee-validate'
import { 
  required, 
  email, 
  min, 
  max, 
} from 'vee-validate/dist/rules'

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('required', {
  ...required,
  message: '{_field_} field can not be empty',
})

extend('email', {
  ...email,
  message: '{_field_} must be valid',
})

extend('email_uniq', {
  params: ['user'],
  validate: (value, {user}) => {
    return !store.getters['users/data'].some(item => {
      return item.id != user.id && item.email == value
    })
  },
  message: 'This Email already exist',
})
