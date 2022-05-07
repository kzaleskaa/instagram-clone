from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User, Follower
from posts.models import Post
from posts.serializers import PostsSerializer


class CurrrentUser(APIView):
    """Manage the data of the logged in user."""

    def get(self, request):
        """Get basic information about user - e.g. first and last name, nickname."""

        user = request.user

        serialized = UserSerializer(user)

        return Response(serialized.data)


class UserByNickname(APIView):
    """Manage users based on nickname."""

    def get(self, request, nickname):
        """Get user's info, created posts and information about follow."""

        try:
            user = User.objects.get(nickname=nickname)

            serialized = UserSerializer(user)

            posts = Post.objects.filter(user=user).order_by("-date")

            if not posts:
                posts = "User does not have any posts."
            else:
                posts = PostsSerializer(posts, many=True)
                posts = posts.data

            following = Follower.objects.filter(follower_id=request.user, user_id=user.pk).count()

            return Response({'user': serialized.data, 'posts': posts, 'follow': bool(following)}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'error': 'User with this nickname does not exist.'}, status=status.HTTP_404_NOT_FOUND)


class ManageFollowers(APIView):
    """Manage information about follow."""

    def post(self, request, user_id):
        """Follow new user (based on user_id)."""

        user = User.objects.get(pk=user_id)
        Follower.objects.create(follower_id=request.user, user_id=user)

        return Response({'msg': 'A new relationship was created.'}, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        """Delete follow."""

        Follower.objects.filter(follower_id=request.user, user_id=user_id).delete()
        return Response({'user': 'Relation deleted.'}, status=status.HTTP_200_OK)
