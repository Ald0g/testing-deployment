from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserListSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = UserListSerializer

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = UserListSerializer

