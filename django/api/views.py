from rest_framework import viewsets
from .models import Block, RawTransactionLog, Transaction, TransactionLog
from .serializers import BlockSerializer, RawTransactionLogSerializer, TransactionSerializer, TransactionLogSerializer

class BlockViewSet(viewsets.ModelViewSet):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer

class RawTransactionLogViewSet(viewsets.ModelViewSet):
    queryset = RawTransactionLog.objects.all()
    serializer_class = RawTransactionLogSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionLogViewSet(viewsets.ModelViewSet):
    queryset = TransactionLog.objects.all()
    serializer_class = TransactionLogSerializer