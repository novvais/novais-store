import { Router } from "express";
import { AdmController } from "../App/Controllers/adminControllers";
import { ClientController } from "../App/Controllers/clientControllers";
import { ProductController } from "../App/Controllers/productsControllers";
import { fileController } from "../App/Controllers/uploadControllers";
import { CategoriesControllers } from "../App/Controllers/categoriesControllers";
// import {  } from "../App/Controllers/cart"
// import {  } from "../App/Controllers/wishlist"
import { ApiError, NotFoundError } from "../Helpers/api-erros";

const router: Router = Router();

router
  .route("/api/admin")
  .post(new AdmController().registerAdm)
  .get(new AdmController().loginAdm);
router
  .route("/api/admin/:id")
  .put(new AdmController().updateAdm)
  .get(new AdmController().detailAdmProfile)
  .delete(new AdmController().deleteAdm);

router
  .route("/api/client")
  .post(new ClientController().registerClientController)
  .get(new ClientController().loginClientController);
router
  .route("/api/client/:id")
  .put(new ClientController().updateClientController)
  .get(new ClientController().detailClientProfileController)
  .delete(new ClientController().deleteClientController);

router
  .route("/api/product")
  .post(new ProductController().registerProductController)
  .get(new ProductController().detailProductController);
router
  .route("/api/product/:id")
  .put(new ProductController().updateProductController)
  .get(new ProductController().listProductsController)
  .delete(new ProductController().deleteProductController);

router.get("/api/upload", fileController);

router.route("/api/cart");
router.route("/api/cart/:id");

export { router };
