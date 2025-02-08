from rest_framework import viewsets, generics
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

class BlockDetailView(generics.RetrieveAPIView):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
    lookup_field = 'block_hash'

class TransactionsByBlockView(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        block_hash = self.kwargs['block_hash']
        return Transaction.objects.filter(block_hash=block_hash)