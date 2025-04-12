import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
  } from 'amazon-cognito-identity-js';
  
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
  