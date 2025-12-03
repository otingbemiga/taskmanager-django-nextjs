from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)  # optional description
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


    @classmethod
    def create_task(cls, title, description='', status='pending'):
        task = cls(title=title, description=description, status=status)
        task.save()
        return task

 
    @classmethod
    def get_all_tasks(cls):
        return cls.objects.all()

   
    @classmethod
    def get_task_by_id(cls, task_id):
        try:
            return cls.objects.get(id=task_id)
        except cls.DoesNotExist:
            return None

    
    def update_task(self, title=None, description=None, status=None):
        if title is not None:
            self.title = title
        if description is not None:
            self.description = description
        if status is not None and status in dict(self.STATUS_CHOICES):
            self.status = status
        self.save()
        return self

  
    def delete_task(self):
        self.delete()
