import os
import random
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.utils.text import slugify

from accounts.models import User
from room.models import Room, RoomMembership


USERS = [
    {"username": "alice",   "email": "alice@example.com",   "password": "pass1234", "bio": "Frontend dev, coffee enthusiast."},
    {"username": "bob",     "email": "bob@example.com",     "password": "pass1234", "bio": "Backend engineer who loves Python."},
    {"username": "carol",   "email": "carol@example.com",   "password": "pass1234", "bio": "Designer & part-time gamer."},
    {"username": "dave",    "email": "dave@example.com",    "password": "pass1234", "bio": "DevOps wizard, Docker fan."},
    {"username": "eve",     "email": "eve@example.com",     "password": "pass1234", "bio": "Security researcher."},
]

ROOMS = [
    {
        "name": "General",
        "description": "A place for everything and anything.",
        "room_type": "public",
        "owner": "alice",
        "members": ["alice", "bob", "carol", "dave", "eve"],
    },
    {
        "name": "Engineering",
        "description": "Tech talk — PRs, bugs, architecture.",
        "room_type": "public",
        "owner": "bob",
        "members": ["alice", "bob", "dave"],
    },
    {
        "name": "Design",
        "description": "Mockups, Figma links and feedback.",
        "room_type": "private",
        "owner": "carol",
        "members": ["alice", "carol"],
    },
    {
        "name": "DevOps",
        "description": "CI/CD, Docker, deployments.",
        "room_type": "private",
        "owner": "dave",
        "members": ["bob", "dave"],
    },
    {
        "name": "Random",
        "description": "Memes, jokes and off-topic chats.",
        "room_type": "public",
        "owner": "eve",
        "members": ["alice", "bob", "carol", "dave", "eve"],
    },
]

MESSAGES_PER_ROOM = [
    # (username, content)
    ("alice",   "Hey everyone, welcome to the channel!"),
    ("bob",     "Thanks! Excited to be here."),
    ("carol",   "This UI is looking great so far 🎨"),
    ("dave",    "Deployed the latest build — should be live now."),
    ("eve",     "I found a small XSS issue on the login page, opening a ticket."),
    ("alice",   "Good catch Eve, thanks!"),
    ("bob",     "I'll look at it after standup."),
    ("carol",   "Can someone review my Figma link?"),
    ("dave",    "Sure, dropping a comment now."),
    ("eve",     "The Docker image size is huge — we should optimise it."),
    ("alice",   "Agreed. Alpine base image should help."),
    ("bob",     "I switched to node:20-alpine already in my PR."),
    ("carol",   "Love the new colour palette by the way 😍"),
    ("dave",    "The Redis cache is cutting response times in half."),
    ("eve",     "Anyone free for a quick sync this afternoon?"),
    ("alice",   "I'm free after 3 PM."),
    ("bob",     "Same here."),
    ("carol",   "Count me in."),
    ("dave",    "Sure, let's do 3:15."),
    ("eve",     "Perfect, I'll send the invite."),
]


def seed_mongo_messages(rooms_map: dict):
    """Insert fake messages into MongoDB using pymongo directly."""
    try:
        import pymongo
    except ImportError:
        return False, "pymongo not installed — skipping MongoDB messages."

    mongo_uri = os.environ.get("MONGO_URI", "mongodb://mongodb:27017/chatapp_messages")
    try:
        client = pymongo.MongoClient(mongo_uri, serverSelectionTimeoutMS=3000)
        client.server_info()
    except Exception as exc:
        return False, f"Could not connect to MongoDB ({exc}) — skipping messages."

    db = client.get_default_database()
    collection = db["messages"]

    docs = []
    now = timezone.now()
    for room_name, room_id in rooms_map.items():
        for i, (username, content) in enumerate(MESSAGES_PER_ROOM):
            user = User.objects.filter(username=username).first()
            if not user:
                continue
            docs.append({
                "roomId":    str(room_id),
                "userId":    str(user.id),
                "username":  username,
                "content":   content,
                "createdAt": now - timedelta(minutes=(len(MESSAGES_PER_ROOM) - i) * 2),
                "edited":    False,
            })

    if docs:
        collection.insert_many(docs)
        client.close()
        return True, f"Inserted {len(docs)} messages across {len(rooms_map)} rooms."

    client.close()
    return True, "No messages to insert."


class Command(BaseCommand):
    help = "Seed the database with demo users, rooms, memberships and chat messages."

    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete all existing seed data before re-seeding.",
        )

    def handle(self, *args, **options):
        if options["flush"]:
            self.stdout.write("Flushing existing data...")
            RoomMembership.objects.all().delete()
            Room.objects.all().delete()
            User.objects.filter(username__in=[u["username"] for u in USERS]).delete()
            self.stdout.write(self.style.WARNING("Existing seed data removed."))

        # --- Users ---
        self.stdout.write("Creating users...")
        user_objects = {}
        for data in USERS:
            user, created = User.objects.get_or_create(
                username=data["username"],
                defaults={
                    "email":    data["email"],
                    "bio":      data["bio"],
                    "is_online": False,
                },
            )
            if created:
                user.set_password(data["password"])
                user.save()
                self.stdout.write(f"  Created user: {user.username}")
            else:
                self.stdout.write(f"  Skipped (exists): {user.username}")
            user_objects[user.username] = user

        # --- Rooms & Memberships ---
        self.stdout.write("Creating rooms...")
        rooms_map = {}  # name -> id (for MongoDB)
        for room_data in ROOMS:
            owner = user_objects.get(room_data["owner"])
            if not owner:
                continue

            base_slug = slugify(room_data["name"])
            slug = base_slug
            counter = 1
            while Room.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1

            room, created = Room.objects.get_or_create(
                name=room_data["name"],
                defaults={
                    "description": room_data["description"],
                    "room_type":   room_data["room_type"],
                    "created_by":  owner,
                    "slug":        slug,
                },
            )
            if created:
                self.stdout.write(f"  Created room: {room.name} ({room.room_type})")
            else:
                self.stdout.write(f"  Skipped (exists): {room.name}")

            rooms_map[room.name] = room.id

            for username in room_data["members"]:
                member = user_objects.get(username)
                if not member:
                    continue
                role = "owner" if username == room_data["owner"] else "member"
                _, mem_created = RoomMembership.objects.get_or_create(
                    user=member,
                    room=room,
                    defaults={
                        "role":             role,
                        "can_send_messages": True,
                        "can_invite_users":  role in ("owner", "admin"),
                    },
                )
                if mem_created:
                    self.stdout.write(f"    Added {username} as {role}")

        # --- MongoDB messages ---
        self.stdout.write("Seeding MongoDB messages...")
        ok, msg = seed_mongo_messages(rooms_map)
        if ok:
            self.stdout.write(self.style.SUCCESS(f"  {msg}"))
        else:
            self.stdout.write(self.style.WARNING(f"  {msg}"))

        self.stdout.write(self.style.SUCCESS("\nSeed complete!"))
        self.stdout.write("")
        self.stdout.write("Demo credentials (all passwords: pass1234):")
        for u in USERS:
            self.stdout.write(f"  {u['username']:10} / {u['password']}  ({u['email']})")
