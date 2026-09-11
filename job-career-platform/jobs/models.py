from django.db import models
from django.contrib.auth.models import User


class Job(models.Model):
    STATUS_CHOICES = [
        ('saved', 'Saved'),
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('rejected', 'Rejected'),
        ('selected', 'Selected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    job_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='saved')
    applied_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.position} @ {self.company} ({self.user.username})"