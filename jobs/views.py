from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job
from .serializers import JobSerializer


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['company', 'position', 'description']
    ordering_fields = ['applied_date', 'created_at', 'company']
    ordering = ['-created_at']  # default order if client doesn't specify

    def get_queryset(self):
        return Job.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)