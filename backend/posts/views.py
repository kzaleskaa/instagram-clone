from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Comment, Like
from users.models import User, Follower
from .serializers import PostsSerializer, CommentSerializer


class ManagePostsViev(APIView):

    def post(self, request):
        try:
            user = request.user

            data = request.data

            image = data["image"]
            description = data["description"]
            lat = data["lat"]
            lon = data["lon"]
            location = data["location"]

            # create new post
            Post.objects.create(user=user, image=image, description=description, lat=lat, lon=lon, location=location)

            return Response({'success': 'New post was successfully created.'},
                            status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response({'error': 'Something went wrong when creating post.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ManagePostDetailViev(APIView):
    def put(self, request, pk: int):
        try:
            user = request.user

            data = request.data
            description = data["description"]

            Post.objects.filter(pk=pk).update(description=description)

            return Response({'success': 'Post updated successfully.'}, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({'error': 'Something went wrong when updating post.'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            user = request.user

            Post.objects.filter(pk=pk).delete()

            return Response({'success': 'Post deleted successfully.'}, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({'error': 'Something went wrong when deleting post.'}, status=status.HTTP_400_BAD_REQUEST)


class ManageComments(APIView):
    def post(self, request, post_id):
        try:
            user = request.user
            data = request.data

            comment_text = data["text"]

            try:
                post = Post.objects.get(pk=post_id)
            except Exception as error:
                return Response({'error': 'Post does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

            Comment.objects.create(user=user, text=comment_text, post=post)

            return Response({'success': 'New comment was successfully created.'},
                            status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response({'error': 'Something went wrong when adding post.'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, post_id):
        try:
            user = request.user

            try:
                post = Post.objects.get(pk=post_id)
            except Exception as error:
                return Response({'error': 'Post does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

            # sort comments
            comments = Comment.objects.filter(post=post).order_by("-date")

            comments = CommentSerializer(comments, many=True)

            likes_number = Like.objects.filter(post=post_id).count()

            liked_by_user = Like.objects.filter(user_id=user, post=post_id).count()

            return Response({"comments": comments.data, "likes_number": likes_number, "like": bool(liked_by_user)}, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({'error': 'Something went wrong when listing comments.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ManageComment(APIView):
    def delete(self, request, comment_id):
        try:
            user = request.user
            comment = Comment.objects.get(pk=comment_id)

            if user == comment.user:
                comment.delete()
                return Response({'success': 'Comment deleted successfully.'}, status=status.HTTP_200_OK)

            else:
                return Response({'error': 'User can not delete this comment.'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as error:
            return Response({'error': 'Something went wrong when deleting comment.'}, status=status.HTTP_400_BAD_REQUEST)


class ManageLikes(APIView):
    def post(self, request, post_id):
        try:
            user = request.user

            post = Post.objects.get(pk=post_id)

            Like.objects.create(user_id=user, post=post)

            return Response({'success': 'New like was successfully added.'},
                        status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response({'error': 'Something went wrong when adding like.'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id):
        try:
            user = request.user

            Like.objects.filter(user_id=user, post=post_id).delete()

            return Response({'success': 'Like was successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as error:
            return Response({'error': 'Something went wrong when deleting like.'}, status=status.HTTP_400_BAD_REQUEST)


class ManageHome(APIView):
    def get(self, request):
        user = request.user

        following = Follower.objects.filter(follower_id=user).values_list("user_id", flat=True)

        users = User.objects.filter(pk__in=following)
        posts = Post.objects.filter(user__in=users).order_by("-date")

        result = PostsSerializer(posts, many=True)

        return Response({"posts": result.data[:10]}, status=status.HTTP_200_OK)
