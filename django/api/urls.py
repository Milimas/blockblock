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
    path('blocks/<str:block_hash>/', views.BlockDetailView.as_view(), name='block-detail'),
    path('blocks/<str:block_hash>/transactions/', views.TransactionsByBlockView.as_view(), name='block-transactions'),
]