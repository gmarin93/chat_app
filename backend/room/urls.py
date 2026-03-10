from django.urls import path
from room.views import RoomView

urlpatterns = [
    path('rooms/', RoomView.as_view(), name='room_list'),
    path('rooms/<slug:slug>/', RoomView.as_view(), name='room_detail'),
]