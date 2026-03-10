from django.db import models
from django.conf import settings
from django.utils.text import slugify

class Room(models.Model):
    """Chat room/channel"""
    
    ROOM_TYPES = [
        ('public', 'Public Channel'),
        ('private', 'Private Group'),
        ('direct', 'Direct Message'),
    ]
    
    # Basic info
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    room_type = models.CharField(max_length=10, choices=ROOM_TYPES, default='public')
    
    # Avatar/image
    avatar = models.ImageField(upload_to='room_avatars/', null=True, blank=True)
    
    # Ownership
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_rooms'
    )
    
    # Members (many-to-many through RoomMembership)
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='RoomMembership',
        related_name='rooms'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'chat_rooms'
        ordering = ['-updated_at']
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.name