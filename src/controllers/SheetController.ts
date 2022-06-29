
import Sheet, { ISheet } from "../models/Sheet";
import WorkingHour, { IWorkingHour } from "../models/workingTime";

import { ObjectId } from "mongoose";




export default class SheetController {


    public async createSheet(body: ISheet) {
        let SheetInfo: ISheet;
        SheetInfo = await Sheet.create(body);

        return SheetInfo;
    }


    public async editSheet(body: any, SheetId: string, note: string, hours: number, date:any) {
        
   
        let SheetInfo:any = await Sheet.findOneAndUpdate({ _id: SheetId,  isDeleted: false }, body, { new: true }).lean();
       

        return SheetInfo;

            


        }
       
    


    public async getSheet() {
        let SheetList:any=[]
        let userInfo: any =[]
        SheetList = await Sheet.aggregate([
            {"$match":{
isDeleted:false
            }}
        ]);



        for(let i = 0; i < SheetList.length;i++){
            
            let userData: any = await WorkingHour.findOne({ code: SheetList[i].code
})
            

          
            
            SheetList[i].userData = userData
            console.log(SheetList);
            


        }
        // for(let i = 0; i < SheetList.length; i++) {
        //     console.log("anklnklnl", SheetList[i].userId);
            
        //     let userData: any = await WorkingHour.findOne({ _id: SheetList[i].userId })

        //     userInfo.push(userData)
        // }
        
      
        return  SheetList    ;
    }

    public async getSheetInfoById(SheetId: string) {
        const SheetInfo: ISheet = await Sheet.findOne({ _id: SheetId, isDeleted: false }).lean();
        return SheetInfo;
    }

    public async deleteSheet(SheetId: string) {
   

        const SheetInfo: ISheet = await Sheet.findOneAndUpdate({ _id: SheetId,  isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return SheetInfo;


    }



    public async createWorkingHour(body:any) {
        let WorkingHourInfo: any;
      
        
         WorkingHourInfo = await  WorkingHour.create(body);

        return  WorkingHourInfo;
    }


    public async editWorkingHour(body: any,  WorkingHourId: string, note: string, hours: number, date: any) {


        let  WorkingHourInfo: any = await  WorkingHour.findOneAndUpdate({ _id:  WorkingHourId, isDeleted: false }, body, { new: true }).lean();


        return  WorkingHourInfo;




    }




    public async getWorkingHour() {
        const  WorkingHourList: IWorkingHour[] = await  WorkingHour.find({ isDeleted: false });
        return  WorkingHourList;
    }

    public async getWorkingHourInfoById( WorkingHourId: string) {
        const  WorkingHourInfo: IWorkingHour = await  WorkingHour.findOne({ _id:  WorkingHourId, isDeleted: false }).lean();
        return  WorkingHourInfo;
    }

    public async deleteWorkingHour( WorkingHourId: string) {


        const  WorkingHourInfo: IWorkingHour = await  WorkingHour.findOneAndUpdate({ _id:  WorkingHourId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return  WorkingHourInfo;


    }
}



  