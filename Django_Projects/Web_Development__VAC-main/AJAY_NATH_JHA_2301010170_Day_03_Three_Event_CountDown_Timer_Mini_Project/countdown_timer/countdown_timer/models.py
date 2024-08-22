from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=100)
    event_date = models.DateTimeField()
    description = models.TextField(blank=True)  # Optional field
    location = models.CharField(max_length=255, blank=True)  # Optional field
    is_active = models.BooleanField(default=True)  # Optional field

    def __str__(self):
        return self.name