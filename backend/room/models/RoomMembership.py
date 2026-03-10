from django.db import models
from django.conf import settings
from .Room import Room


class RoomMembership(models.Model):
    """Track user membership and roles in rooms"""
    
    ROLE_CHOICES = [
        ('owner', 'Owner'),
        ('admin', 'Admin'),
        ('member', 'Member'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE
    )
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='member'
    )
    
    # Permissions
    can_send_messages = models.BooleanField(default=True)
    can_invite_users = models.BooleanField(default=False)
    
    # Metadata
    joined_at = models.DateTimeField(auto_now_add=True)
    last_read_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'room_memberships'
        unique_together = ['user', 'room']
        
    def __str__(self):
        return f"{self.user.username} in {self.room.name} ({self.role})"