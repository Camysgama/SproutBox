import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js'

const poolData: ICognitoUserPoolData = {
    ClientId: '2ks0h871odfgp2dofmn066icnb',
    UserPoolId: 'sa-east-1_EXjfQHrvd'
}

export default new CognitoUserPool(poolData)