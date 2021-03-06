# Generated by Django 2.2.6 on 2019-10-24 18:33

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exercise_name', models.CharField(max_length=100)),
                ('exercise_description', models.CharField(max_length=1000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ExerciseSetDetail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sets', models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000)])),
                ('reps', models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000)])),
                ('exercise', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='exerciseSetDetail', to='core.Exercise')),
            ],
        ),
        migrations.CreateModel(
            name='MuscleGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('muscle_group_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('program_name', models.CharField(max_length=100)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='programs', to='core.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='ExerciseWeight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('set_number', models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000)])),
                ('rep_number', models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000)])),
                ('weight', models.FloatField(null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000)])),
                ('exercise', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='exerciseWeights', to='core.Exercise')),
                ('exercise_reps', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='exerciseWeights', to='core.ExerciseSetDetail')),
            ],
        ),
        migrations.AddField(
            model_name='exercisesetdetail',
            name='program',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='exerciseSetDetail', to='core.Program'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='muscle_group',
            field=models.ManyToManyField(blank=True, related_name='muscleGroups', to='core.MuscleGroup'),
        ),
    ]
