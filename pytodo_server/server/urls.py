from django.urls import path

from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    # /monthtodos/2
    path('monthtodos/<int:user_id>', views.getdays, name='getdays'),
    # /daytodos/2
    path('daytodos/<int:user_id>', views.gettodos, name='gettodos'),
    # /check
    path('check', views.double_check, name='double_check'),
    # /signup
    path('signup', views.signup, name='signup'),      
    # /token
    path("token", TokenObtainPairView.as_view(), name="obtain_token"),
    # /token/refresh
    path("token/refresh", TokenRefreshView.as_view(), name="refresh_token"),
    # /toden/verify
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),  
]