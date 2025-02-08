from rest_framework import serializers
from .models import Block, RawTransactionLog, Transaction, TransactionLog
from .fields import DecimalField

class BlockSerializer(serializers.ModelSerializer):
    chain_id = DecimalField()
    number = DecimalField()
    time = DecimalField()
    created_at = DecimalField()
    transaction_count = serializers.SerializerMethodField('get_transaction_count')

    class Meta:
        model = Block
        fields = '__all__'
    
    def get_transaction_count(self, obj):
        return Transaction.objects.filter(block_hash=obj.hash).count()

class RawTransactionLogSerializer(serializers.ModelSerializer):
    index = DecimalField()
    chain_id = DecimalField()
    block_number = DecimalField()

    class Meta:
        model = RawTransactionLog
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    index = DecimalField()
    chain_id = DecimalField()
    value = DecimalField()

    class Meta:
        model = Transaction
        fields = '__all__'

class TransactionLogSerializer(serializers.ModelSerializer):
    index = DecimalField()

    class Meta:
        model = TransactionLog
        fields = '__all__'