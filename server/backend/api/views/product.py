from rest_framework import viewsets
from ..serializers.ProductSerializer import ProductSerializer, ProductNestedSerializer
from ..models import Product
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

class ProductDetailView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny, )

    def get(self, request, *args, **kwargs):
        product = Product.objects.filter(id=kwargs['pk'])
        serializer = ProductSerializer(product, context={"request": request}, many=True)
        response = serializer.data
        return Response(response, status=status.HTTP_200_OK)

class ProductPostLikePushView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, )
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        like=request.data.pop('image')
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductPostLikePopView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        like=request.data.pop('image')
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductPostDisLikePushView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        like=request.data.pop('image')
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductPostDislikePopView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        like=request.data.pop('image')
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductPostLovePushView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        like=request.data.pop('image')
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductPostLovePopView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        product = self.get_object(pk)
        like=request.data.pop('image')
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class ProductNestedView(APIView):
#     serializer_class = ProductSerializer
#     permission_classes = (AllowAny, )
#     def depth(self, obj, request):
#         pk=obj['id']
#         product = Product.objects.filter(parent_product=pk)
#         serializer = ProductSerializer(product, context={"request": request}, many=True)
#         respons = serializer.data
#         obj['children']=respons
#         if len(respons):
#             for children in obj['children']:
#                 self.depth(children, request)
            
#         return obj
#     def get(self, request, *args, **kwargs):
#         responses=[]
#         product = Product.objects.filter(is_sector=True)
#         serializer = ProductSerializer(product, context={"request": request}, many=True)
#         response = serializer.data
#         if(len(response)):
#             for resp in response:
#                 responses.append(self.depth(resp, request))

#         return Response(responses, status=status.HTTP_200_OK)

