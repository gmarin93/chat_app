from django.urls import path
from room.views import RoomView
from room.views import RoomMembershipView

urlpatterns = [
    path('rooms/', RoomView.as_view(), name='room_list'),
    path('rooms/<slug:slug>/', RoomView.as_view(), name='room_detail'),
    path('rooms/direct/', RoomView.as_view(), name='room_direct'),  # <-- add this
    path('rooms/direct-messages/', RoomMembershipView.as_view(), name='room_membership_list'),
]