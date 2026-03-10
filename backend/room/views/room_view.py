import django.contrib.auth.models
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from room.models import Room
from room.serializers import RoomSerializer
from rest_framework.permissions import AllowAny

class RoomView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)