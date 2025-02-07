from rest_framework import serializers
from decimal import Decimal, InvalidOperation

class DecimalField(serializers.Field):
    def to_representation(self, value):
        if isinstance(value, Decimal):
            return str(value)
        return value

    def to_internal_value(self, data):
        try:
            return Decimal(data)
        except InvalidOperation:
            raise serializers.ValidationError("Invalid decimal value")