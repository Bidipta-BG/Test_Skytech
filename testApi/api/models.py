from django.db import models

# Create your models here.

class User(models.Model):
    user_id= models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    state = models.CharField(max_length=50)
    pincode = models.CharField(max_length=50)
    user_type = models.CharField(max_length=100, choices=
                                 (('Super Admin', 'Super Admin'),
                                  ('State Admin', 'State Admin'),
                                  ('District Admin', 'District Admin'),
                                  ('Center Incharge', 'Center Incharge'),
                                  ('Examiner', 'Examiner'),
                                  ('Trainer', 'Trainer'),
                                  ('Student', 'Student')))
    created_date = models.DateTimeField(auto_now=True)
    isDeleted = models.BooleanField(default=False)