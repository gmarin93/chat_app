from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView 
from accounts.views import UserView, AuthView

urlpatterns = [
    path('user/', UserView.as_view(), name='user'),
    path('token/', AuthView.as_view(), name='token_obtain_pair'),
    path('register/', UserView.as_view(), name='register'),
   # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]