import django.contrib.auth.models
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from room.models import Room
from room.serializers import RoomSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

class RoomView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        target_user_id = request.data.get('target_user_id')
        User = get_user_model()
        target_user = User.objects.get(id=target_user_id)
        
        room = Room.objects.filter(
            room_type='direct',
            members__in=[target_user.id]
        ).filter(members__in=[target_user.id]).first()
                   
        if not room:
            room = Room.objects.create(
                name=f"{request.user.username} - {target_user.username}",
                room_type='direct',
                created_by=request.user
            )
            room.members.add(request.user)
            room.members.add(target_user)
            room.save()
            
        return Response(RoomSerializer(room).data)