# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-15 07:49
from __future__ import unicode_literals
from __future__ import print_function

import os.path

from django.db import migrations


def copy_to_screenshots(apps, schema_editor):
    Source = apps.get_model('trans', 'Source')
    Screenshot = apps.get_model('screenshots', 'Screenshot')

    for source in Source.objects.exclude(screenshot=''):
        try:
            fileobj = source.screenshot.file
        except IOError:
            print('Failed to load screenshot {0}, skipping!'.format(
                source.screenshot
            ))
            continue
        shot = Screenshot.objects.create(
            image=source.screenshot,
            name=os.path.basename(fileobj.name),
            component=source.subproject,
        )
        shot.sources.add(source)


class Migration(migrations.Migration):

    dependencies = [
        ('screenshots', '0001_initial'),
        ('trans', '0069_source_screenshot'),
    ]

    operations = [
        migrations.RunPython(copy_to_screenshots)
    ]