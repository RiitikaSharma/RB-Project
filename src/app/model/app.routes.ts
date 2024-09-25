export class api{
    public static routes ={
        personal:' http://localhost:4202/personal',
        address:'http://localhost:4202/address'
    }
    
    public static user ={
        register: 'http://localhost:4202/api/register',
        login:' http://localhost:4202/api/authenticate',
        userprofile: 'http://localhost:4202/api/userProfile',
    }

    public static resume ={
        getUserResume: 'http://localhost:4202/api/getResume/',
        uploadResume: 'http://localhost:4202/api/uploadResume',
        updateResume: 'http://localhost:4202/api/updateResume/',
        deleteResume: 'http://localhost:4202/api/deleteResume/',
        deleteAllResume: 'http://localhost:4202/api/deleteAllResume',
        

    }

}