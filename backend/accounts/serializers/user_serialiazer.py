import django.contrib.auth.models
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = django.contrib.auth.models.User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = django.contrib.auth.models.User.objects.create_user(**validated_data)
        return user