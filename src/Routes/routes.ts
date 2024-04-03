import { Router } from "express";
import multer from "multer";
import { AdmController } from "../Controllers/adminControllers";
import { ClientController } from "../Controllers/clientControllers";
import { ProductController } from "../Controllers/productsControllers";
import { fileController } from "../Controllers/uploadControllers";
import { CategoriesController } from "../Controllers/categoriesControllers";
import { CartController } from "../Controllers/cartControllers";
import { WishlistController } from "../Controllers/wishlistControllers";
// import { upload } from "../Middleware/multer";

const router: Router = Router();

router.route("/api/admin").post(new AdmController().registerAdm);

router.route("/api/login").post(new AdmController().loginAdm);

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

// router.get(
//   "/api/upload",
//   multer(upload.getConfig).single,
//   new fileController().uploadController
// );

router.route("/api/categories").get(new CategoriesController().listCategoriesController)

router.route("/api/categories/:id").delete(new CategoriesController().deleteCategory)

router.route("/api/cart").post(new CartController().registerCartController);

router
  .route("/api/cart/:id")
  .put(new CartController().updateCartController)
  .get(new CartController().listCartController)
  .delete(new CartController().deleteCartController);

router
  .route("/api/wishlist")
  .post(new WishlistController().registerWhishlistController);

router
  .route("/api/wishlist/:id")
  .delete(new WishlistController().deleteWishlistControllers)
  .get(new WishlistController().listWishlistControllers);

export { router };
