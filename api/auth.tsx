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

    const user = authData.user;
    const userId = user.id;

    console.log('Logging in with Supabase user ID:', userId);

    // Step 1: Check if user_account exists
    const { data: userAccount, error: fetchError } = await supabase
      .from('user_account')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking user_account:', fetchError.message);
      return { success: false, error: fetchError.message };
    }

    // Step 2: If not found, insert a new row with full metadata
    if (!userAccount) {
      const { data: newUserAccount, error: insertError } = await supabase
        .from('user_account')
        .insert([
          {
            id: userId,
            full_name: user.user_metadata?.full_name ?? '',
            email: user.email,
            created_at: user.created_at,
            last_sign_in_at: user.last_sign_in_at,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error(
          'Error inserting into user_account:',
          insertError.message
        );
        return { success: false, error: insertError.message };
      }

      return {
        success: true,
        data: {
          authUser: user,
          userAccount: newUserAccount,
        },
      };
    }

    // Step 3: If user_account exists, return it
    return {
      success: true,
      data: {
        authUser: user,
        userAccount,
      },
    };
  } catch (err) {
    console.error('Unexpected error during login:', err);
    return { success: false, error: 'Unexpected error occurred' };
  }
}
