export class LoggedInUser{
   public id:string;
   public access_token:string;
   public username : string;
   public fullname : string;
   public email : string;
   public avatar:string;
   
   constructor (access_token : string,username:string,fullname:string,email:string,avatar:string)
   {
        this.access_token=access_token;
        this.fullname=fullname;
        this.email=email;
        this.username=username;
        this.avatar=avatar;
   }
  
   

}