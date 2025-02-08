from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Block, RawTransactionLog, Transaction, TransactionLog
from .serializers import BlockSerializer, RawTransactionLogSerializer, TransactionSerializer, TransactionLogSerializer

class BlockViewSet(viewsets.ModelViewSet):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
    filterset_fields = ['hash', 'number']

    @action(detail=False, methods=['get'])
    def last(self, request):
        last_block = Block.objects.order_by('-number').first()
        serializer = self.get_serializer(last_block)
        return Response(serializer.data)

class RawTransactionLogViewSet(viewsets.ModelViewSet):
    queryset = RawTransactionLog.objects.all()
    serializer_class = RawTransactionLogSerializer
    filterset_fields = ['transaction_hash', 'block_number', 'hash', 'contract_address']

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filterset_fields = ['hash', 'block_hash', 'to', 'contract_address']

    @action(detail=False, methods=['get'])
    def count(self, request):
        count = Transaction.objects.count()
        return Response({'count': count})

class TransactionLogViewSet(viewsets.ModelViewSet):
    queryset = TransactionLog.objects.all()
    serializer_class = TransactionLogSerializer

class BlockDetailView(generics.RetrieveAPIView):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
    lookup_field = 'block_hash'

    @action(detail=True, methods=['get'])
    def transactions(self, request, block_hash=None):
        block = self.get_object()
        transactions = Transaction.objects.filter(block_hash=block.hash)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

class TransactionsByBlockView(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        block_hash = self.kwargs['block_hash']
        return Transaction.objects.filter(block_hash=block_hash)

class WalletTransactionsView(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        wallet_address = self.kwargs['wallet_address']
        return Transaction.objects.filter(to=wallet_address)