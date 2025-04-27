import { supabase } from './apiClient';

export async function registerUser(
  email: string,
  password: string,
  fullName: string
) {
  try {
    // Use the Supabase client to sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Store the full name in user metadata
        },
      },
    });

    if (error) {
      console.error('Error during registration:', error.message);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: 'Registration successful. Please verify your email.',
    };
  } catch (err) {
    console.error('Unexpected error during registration:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const { data: authData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      console.error('Error during login:', loginError.message);
      return { success: false, error: loginError.message };
    }

    // Now that the user is authenticated, insert into user_account
    const { data: userAccountData, error: userAccountError } = await supabase
      .from('user_account')
      .insert([
        {
          id: authData.user.id,
          full_name: authData.user.user_metadata.full_name, // pulling from user metadata
        },
      ])
      .single();

    if (userAccountError) {
      console.error(
        'Error inserting into user_account:',
        userAccountError.message
      );
      return { success: false, error: userAccountError.message };
    }

    return { success: true, data: authData };
  } catch (err) {
    console.error('Unexpected error during login:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}
