# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Block(models.Model):
    hash = models.TextField(primary_key=True)
    chain_id = models.DecimalField(max_digits=65535, decimal_places=65535)
    number = models.DecimalField(max_digits=65535, decimal_places=65535)
    time = models.DecimalField(max_digits=65535, decimal_places=65535)
    created_at = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'block'


class RawTransactionLog(models.Model):
    hash = models.TextField(primary_key=True)
    index = models.DecimalField(max_digits=65535, decimal_places=65535)
    chain_id = models.DecimalField(max_digits=65535, decimal_places=65535)
    block_number = models.DecimalField(max_digits=65535, decimal_places=65535)
    transaction_hash = models.TextField()
    contract_address = models.TextField()
    log = models.JSONField()

    class Meta:
        managed = False
        db_table = 'raw_transaction_log'


class Transaction(models.Model):
    hash = models.TextField(primary_key=True)
    index = models.DecimalField(max_digits=65535, decimal_places=65535)
    block_hash = models.ForeignKey(Block, models.DO_NOTHING, db_column='block_hash', blank=True, null=True)
    chain_id = models.DecimalField(max_digits=65535, decimal_places=65535)
    contract_address = models.TextField(blank=True, null=True)
    to = models.TextField(blank=True, null=True)
    value = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transaction'


class TransactionLog(models.Model):
    hash = models.TextField(primary_key=True)
    index = models.DecimalField(max_digits=65535, decimal_places=65535)
    transaction_hash = models.ForeignKey(Transaction, models.DO_NOTHING, db_column='transaction_hash', blank=True, null=True)
    contract_address = models.TextField()
    event_name = models.TextField()
    event_alias = models.TextField()
    data = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'transaction_log'
