package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	ProductRoutes(r)
	TransactionRoutes(r)
	AuthRoutes(r)
	CartRoutes(r)
}
