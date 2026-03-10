"""
Chat models package.

This __init__.py file re-exports all models from their individual files,
allowing you to import them directly from chat.models instead of 
chat.models.Room or chat.models.RoomMembership.

Usage:
    from chat.models import Room, RoomMembership
    
Instead of:
    from chat.models.Room import Room
    from chat.models.RoomMembership import RoomMembership
"""

from .Room import Room
from .RoomMembership import RoomMembership

# This controls what gets imported with "from chat.models import *"
__all__ = [
    'Room',
    'RoomMembership',
]