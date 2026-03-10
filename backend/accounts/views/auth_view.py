from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.serializers.auth_serializer import AuthSerializer

class AuthView(TokenObtainPairView):
    serializer_class = AuthSerializer