from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'blocks', views.BlockViewSet)
router.register(r'rawtransactionlogs', views.RawTransactionLogViewSet)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'transactionlogs', views.TransactionLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]