import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { CategoryService } from "../services/categoriesService";
import { CategoryRepository } from "../repositories/categoriesRepository";

const categoriesRouter = Router({ mergeParams: true });

const repository = new CategoryRepository();
const service = new CategoryService(repository);
const controller = new CategoryController(service);

categoriesRouter.get("/", (req, res, next) => controller.findAll(req, res, next));
categoriesRouter.get("/:id", (req, res, next) => controller.findById(req, res, next));
categoriesRouter.post("/", (req, res, next) => controller.create(req, res, next));
categoriesRouter.put("/:id", (req, res, next) => controller.update(req, res, next));
categoriesRouter.delete("/:id", (req, res, next) => controller.remove(req, res, next));

export { categoriesRouter };
