# Generated by Django 5.1.6 on 2025-02-28 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0012_customer_image_alter_customer_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='password',
            field=models.CharField(max_length=10000),
        ),
    ]
