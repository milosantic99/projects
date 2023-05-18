export class Host{
    public static url : string = "https://localhost:7223";
    //public static url : String = "http://147.91.204.115:10046";

    static getUrl(){
        return Host.url;
    }
}