import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
  } from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
  const poolData = {
    UserPoolId: `${process.env.EXPO_PUBLIC_USER_POOL_ID}`,
    ClientId: `${process.env.EXPO_PUBLIC_CLIENT_ID}`,
  };
  
  const userPool = new CognitoUserPool(poolData);
  
  class CognitoService {
    signUp(email:string, password:string) {
      return new Promise((resolve, reject) => {
        userPool.signUp(email, password, [], [], (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      });
    }
  
    signIn(email:any, password:any) {
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
  
      return new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
          onSuccess: (session) => {
            const idToken = session.getIdToken().getJwtToken();
            const accessToken = session.getAccessToken().getJwtToken();
            const refreshToken = session.getRefreshToken().getToken();
  
            resolve({
              idToken,
              accessToken,
              refreshToken,
              session,
            });
          },
          onFailure: (err) => reject(err),
        });
      });
    }
    verifyAccount(confirmationCode: string, email: any): Promise<boolean> {
      const userData = {
        Username: email,
        Pool: userPool,
      };
    
      const cognitoUser = new CognitoUser(userData);
    
      return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
          if (err) {
            console.error("Error confirming sign-up:", err);
            reject(err);
          } else {
            console.log("Sign-up confirmed:", result);
            resolve(true);
          }
        });
      });
    }
    
    tryAutoRefresh = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const refreshTokenValue = await AsyncStorage.getItem('refreshToken');
        if (!email || !refreshTokenValue) {
          return null;
        }
    
        const cognitoUser = new CognitoUser({
          Username: email,
          Pool: userPool,
        });
    
        const refreshToken = {
          getToken: () => refreshTokenValue,
        };
    
        // Refresh the session using the refresh token
        return new Promise((resolve, reject) => {
          cognitoUser.refreshSession(refreshToken, async (err, session) => {
            if (err) {
              console.log('Error refreshing session:', err);
              return reject(err);
            }
    
            const idToken = session.getIdToken().getJwtToken();
            const newRefreshToken = session.getRefreshToken().getToken();
    
            await AsyncStorage.setItem('idToken', idToken);
            await AsyncStorage.setItem('refreshToken', newRefreshToken);
    
            resolve({
              idToken,
              refreshToken: newRefreshToken,
            });
          });
        });
      } catch (err) {
        console.error('Failed to refresh session:', err);
        return false;
      }
    };

    getCurrentUser() {
      return userPool.getCurrentUser();
    }
  
    signOut() {
      const user = userPool.getCurrentUser();
      if (user) user.signOut();
      console.log('User Signed Out');
    }
  }
  
  export default new CognitoService();
  