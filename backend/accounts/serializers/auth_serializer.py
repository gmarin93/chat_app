from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AuthSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)  # gets access + refresh tokens
        user = self.user
        data['user'] = {
            'id':       user.id,
            'username': user.username,
            'email':    user.email,
            'avatar':   user.avatar.url if user.avatar else None,
        }
        return data