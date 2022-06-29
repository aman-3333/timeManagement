import express from "express";

import { IWorkingHour } from "../models/workingTime";
import { ISheet } from "../models/Sheet"
import SheetController from "../controllers/SheetController";
import { successResponse, errorResponse } from "../services/apiResponse"
import { ObjectId } from "mongoose";
//import { IBusinessType } from "../models/BusinessType"
const router = express.Router();






router.post("/", async (req, res) => {
    try {
        const body = req.body as ISheet;

        const controller = new SheetController();
        const response: ISheet = await controller.createSheet(body);
        res.status(200).json(successResponse("create Sheet", response, res.statusCode));
    } catch (error) {
        console.error("error in create Sheet", error);
        res.status(500).json(errorResponse("error in create Sheet", res.statusCode));
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const SheetId = req.params.id;
        const note = req.body.note; const hours = req.body.hours; const date = req.body.date;
        const body = req.body;
        const controller = new SheetController();
        const response = await controller.editSheet(body, SheetId, note, hours, date);
        res.status(200).json(successResponse("Sheet update", response, res.statusCode));
    } catch (error) {
        console.error("error in Sheet update", error);
        res.status(500).json(errorResponse("error in Sheet update", res.statusCode));
    }
});

router.get("/SheetList", async (req, res) => {
    try {
        const controller = new SheetController();
        const businessTypeId = req.query.businessTypeId;
        const response= await controller.getSheet();
        res.status(200).json(successResponse("get Sheet", response, res.statusCode));
    } catch (error) {
        console.error("error in get Sheet", error);
        res.status(500).json(errorResponse("error in get Sheet", res.statusCode));
    }
});


router.get("/:id", async (req, res) => {
    try {
        const SheetId: string = req.params.id;
     
        const controller = new SheetController();
        const response: ISheet = await controller.getSheetInfoById(SheetId);
        res.status(200).json(successResponse("get Sheet by Id ", response, res.statusCode));
    } catch (error) {
        console.error("error in get Sheet by Id", error);
        res.status(500).json(errorResponse("error in get Sheet by Id", res.statusCode));
    }
});


router.patch("/deleteSheet/:id", async (req, res) => {
    try {
        const SheetId = req.params.id;
      
        const controller = new SheetController();
        const response: ISheet = await controller.deleteSheet(SheetId);
        res.status(200).json(successResponse("delete Sheet", response, res.statusCode));
    } catch (error) {
        console.error("error in delete Sheet", error);
        res.status(500).json(errorResponse("error in delete Sheet", res.statusCode));
    }
})


router.post("/WorkingHour", async (req, res) => {
    try {
        const body = req.body ;

        const controller = new SheetController();
        const response = await controller.createWorkingHour(body);
        res.status(200).json(successResponse("create WorkingHour", response, res.statusCode));
    } catch (error) {
        console.error("error in create WorkingHour", error);
        res.status(500).json(errorResponse("error in create WorkingHour", res.statusCode));
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const WorkingHourId = req.params.id;
        const note = req.body.note; const hours = req.body.hours; const date = req.body.date;
        const body = req.body;
        const controller = new SheetController();
        const response = await controller.editWorkingHour(body, WorkingHourId, note, hours, date);
        res.status(200).json(successResponse("WorkingHour update", response, res.statusCode));
    } catch (error) {
        console.error("error in WorkingHour update", error);
        res.status(500).json(errorResponse("error in WorkingHour update", res.statusCode));
    }
});

router.get("/WorkingHourList", async (req, res) => {
    try {
        const controller = new SheetController();
        const businessTypeId = req.query.businessTypeId;
        const response = await controller.getWorkingHour();
        res.status(200).json(successResponse("get WorkingHour", response, res.statusCode));
    } catch (error) {
        console.error("error in get WorkingHour", error);
        res.status(500).json(errorResponse("error in get WorkingHour", res.statusCode));
    }
});


router.get("WorkingHour/:id", async (req, res) => {
    try {
        const WorkingHourId: string = req.params.id;

        const controller = new SheetController();
        const response: IWorkingHour = await controller.getWorkingHourInfoById(WorkingHourId);
        res.status(200).json(successResponse("get WorkingHour by Id ", response, res.statusCode));
    } catch (error) {
        console.error("error in get WorkingHour by Id", error);
        res.status(500).json(errorResponse("error in get WorkingHour by Id", res.statusCode));
    }
});


router.patch("/deleteWorkingHour/:id", async (req, res) => {
    try {
        const WorkingHourId = req.body.WorkingHourId;

        const controller = new SheetController();
        const response: IWorkingHour = await controller.deleteWorkingHour(WorkingHourId);
        res.status(200).json(successResponse("delete WorkingHour", response, res.statusCode));
    } catch (error) {
        console.error("error in delete WorkingHour", error);
        res.status(500).json(errorResponse("error in delete WorkingHour", res.statusCode));
    }
})

export default router;
