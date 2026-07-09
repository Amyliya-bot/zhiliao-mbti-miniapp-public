// Canvas share card generation for MBTI results
// Uses wx.createOffscreenCanvas to avoid CSS/buffer dimension conflicts
const CARD_W = 500;

// ── Helpers ──

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth) {
  var safeW = maxWidth - 14;
  var lines = [];
  var current = '';
  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    var test = current + ch;
    if (ctx.measureText(test).width > safeW && current.length > 0) {
      lines.push(current);
      current = ch;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function measureTextHeight(ctx, text, maxWidth, lineHeight, maxLines) {
  if (!text) return 0;
  var lines = wrapText(ctx, text, maxWidth);
  if (maxLines && lines.length > maxLines) lines = lines.slice(0, maxLines);
  return lines.length * lineHeight;
}

function drawText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  if (!text) return 0;
  var lines = wrapText(ctx, text, maxWidth);
  if (maxLines && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[lines.length - 1] = lines[lines.length - 1].replace(/.{1,2}$/, '…');
  }
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + i * lineHeight);
  }
  return lines.length * lineHeight;
}

// ── Result Card (Dark Theme) ──

function drawResultCard(ctx, data) {
  var PAD = 40, cy = 44, cx = CARD_W / 2;

  // Type badge
  var badgeW = 160, badgeH = 52;
  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, cx - badgeW / 2, cy, badgeW, badgeH, badgeH / 2);
  ctx.fill();
  ctx.fillStyle = '#1C1C1E';
  ctx.font = 'bold 32px -apple-system, "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data.typeCode, cx, cy + badgeH / 2);
  cy += badgeH + 22;

  // Type name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px -apple-system, "PingFang SC", sans-serif';
  ctx.fillText(data.typeName + '人格', cx, cy);
  cy += 34;

  // Description (max 3 lines)
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = '14px -apple-system, "PingFang SC", sans-serif';
  var descMaxW = CARD_W - PAD * 2;
  var descLines = wrapText(ctx, data.resultDesc || '', descMaxW);
  if (descLines.length > 3) descLines = descLines.slice(0, 3);
  for (var i = 0; i < descLines.length; i++) {
    ctx.fillText(descLines[i], cx, cy);
    cy += 22;
  }
  cy += 20;

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(48, cy);
  ctx.lineTo(CARD_W - 48, cy);
  ctx.stroke();
  cy += 32;

  // Dimension bars
  var dimPairs = [
    { left: 'I', right: 'E', leftName: '内向', rightName: '外向' },
    { left: 'N', right: 'S', leftName: '直觉', rightName: '实感' },
    { left: 'T', right: 'F', leftName: '理性', rightName: '情感' },
    { left: 'J', right: 'P', leftName: '判断', rightName: '感知' }
  ];
  var barH = 14, barGap = 30, barW = 250, barLeft = 125;

  for (var i = 0; i < 4; i++) {
    var dim = data.dimensions[i] || {};
    var y = cy + i * (barH + barGap);

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'bold 13px -apple-system, "PingFang SC", sans-serif';
    ctx.fillText(dimPairs[i].right, barLeft - 14, y - 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '11px -apple-system, "PingFang SC", sans-serif';
    ctx.fillText((dim.rightPct || 0) + '%', barLeft - 14, y + barH + 6);

    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    roundRect(ctx, barLeft, y, barW, barH, barH / 2);
    ctx.fill();

    var dominantPct = Math.max(dim.leftPct || 0, dim.rightPct || 0);
    var fillW = Math.max((barW * dominantPct) / 100, barH / 2);
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, barLeft, y, fillW, barH, barH / 2);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'bold 13px -apple-system, "PingFang SC", sans-serif';
    ctx.fillText(dimPairs[i].left, barLeft + barW + 14, y - 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '11px -apple-system, "PingFang SC", sans-serif';
    ctx.fillText((dim.leftPct || 0) + '%', barLeft + barW + 14, y + barH + 6);
  }
  cy += 4 * (barH + barGap) + 36;

  // Impression
  var impText = data.impression || '';
  var impMaxW = CARD_W - PAD * 2 - 48;
  var impTextH = measureTextHeight(ctx, impText, impMaxW, 21, 6);
  var impBoxH = Math.max(impTextH + 66, 90);

  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  roundRect(ctx, 32, cy, CARD_W - 64, impBoxH, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  roundRect(ctx, 32, cy, CARD_W - 64, impBoxH, 20);
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
  ctx.fillText('知聊对你的印象', 56, cy + 28);

  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '14px -apple-system, "PingFang SC", sans-serif';
  drawText(ctx, impText, 56, cy + 54, impMaxW, 21, 6);
  cy += impBoxH + 28;

  // Footer
  cy += 10;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
  ctx.fillText('知聊 · MBTI 对话测试', cx, cy);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.font = '10px -apple-system, "PingFang SC", sans-serif';
  ctx.fillText('AI 测试结果仅供参考', cx, cy + 20);

  return cy + 56;
}

// ── Full Report Card (White Theme) ──

function drawFullReportCard(ctx, data) {
  var PAD = 40, cy = 44, cx = CARD_W / 2;

  // Hero
  var badgeSize = 100, badgeR = 24;
  ctx.fillStyle = '#1C1C1E';
  roundRect(ctx, cx - badgeSize / 2, cy, badgeSize, badgeSize, badgeR);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 40px -apple-system, "PingFang SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data.typeCode, cx, cy + badgeSize / 2);
  cy += badgeSize + 18;

  ctx.fillStyle = '#1C1C1E';
  ctx.font = 'bold 28px -apple-system, "PingFang SC", sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('"' + data.typeName + '"', cx, cy);
  cy += 48;

  // Tags
  var groupName = data.groupName || '';
  var nameEn = data.typeNameEn || '';
  ctx.font = '13px -apple-system, "PingFang SC", sans-serif';
  var gW = groupName ? ctx.measureText(groupName).width + 28 : 0;
  var eW = nameEn ? ctx.measureText(nameEn).width + 28 : 0;
  var tagsW = gW + eW + (gW && eW ? 16 : 0);
  var tagX = cx - tagsW / 2;

  if (groupName) {
    ctx.fillStyle = '#F2F2F7';
    roundRect(ctx, tagX, cy - 11, gW, 26, 13);
    ctx.fill();
    ctx.fillStyle = '#636366';
    ctx.fillText(groupName, tagX + gW / 2, cy + 3);
    tagX += gW + 16;
  }
  if (nameEn) {
    ctx.fillStyle = '#1C1C1E';
    roundRect(ctx, tagX, cy - 11, eW, 26, 13);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(nameEn, tagX + eW / 2, cy + 3);
  }
  cy += 48;

  // Section: 维度分析
  drawSecTitle(ctx, '维度分析', PAD, cy);
  cy += 28;
  var barH = 16, barGap = 34, barW = 260, barX = 120;

  var dims = data.dimensions || [];
  for (var i = 0; i < Math.min(dims.length, 4); i++) {
    var dim = dims[i];
    var y = cy + i * (barH + barGap);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#8E8E93';
    ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
    var rl = dim.rightLabel ? dim.rightLabel.split('(')[0] : '';
    ctx.fillText(rl, barX - 12, y + barH / 2 + 4);
    ctx.fillStyle = '#1C1C1E';
    ctx.font = 'bold 14px -apple-system, "PingFang SC", sans-serif';
    ctx.fillText((dim.rightPct || 0) + '%', barX - 12, y - 6);

    ctx.fillStyle = '#F2F2F7';
    roundRect(ctx, barX, y, barW, barH, barH / 2);
    ctx.fill();
    var fillW = Math.max(((barW * (dim.barPct || 50)) / 100), barH / 2);
    ctx.fillStyle = '#1C1C1E';
    roundRect(ctx, barX, y, fillW, barH, barH / 2);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#8E8E93';
    ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
    var ll = dim.leftLabel ? dim.leftLabel.split('(')[0] : '';
    ctx.fillText(ll, barX + barW + 12, y + barH / 2 + 4);
    ctx.fillStyle = '#1C1C1E';
    ctx.font = 'bold 14px -apple-system, "PingFang SC", sans-serif';
    ctx.fillText((dim.leftPct || 0) + '%', barX + barW + 12, y - 6);
  }
  cy += 4 * (barH + barGap) + 24;

  // Section: 主观印象
  drawSecTitle(ctx, '主观印象', PAD, cy);
  cy += 28;
  var impText = data.impression || '';
  var impMaxW = CARD_W - PAD * 2 - 48;
  var impTextH = measureTextHeight(ctx, impText, impMaxW, 22, 8);
  var impBoxH = Math.max(impTextH + 56, 80);

  ctx.fillStyle = '#1C1C1E';
  roundRect(ctx, PAD, cy, CARD_W - PAD * 2, impBoxH, 24);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '14px -apple-system, "PingFang SC", sans-serif';
  ctx.textAlign = 'left';
  drawText(ctx, impText, PAD + 24, cy + 24, impMaxW, 22, 8);
  cy += impBoxH + 24;

  // Section: 核心特质
  var traits = data.traitList || [];
  if (traits.length > 0) {
    drawSecTitle(ctx, '核心特质', PAD, cy);
    cy += 28;
    var chipW = (CARD_W - PAD * 2 - 16) / 2;
    var textMaxW = chipW - 28;
    var rows = Math.ceil(traits.length / 2);

    for (var i = 0; i < traits.length; i++) {
      var col = i % 2, row = Math.floor(i / 2);
      var chipX = PAD + col * (chipW + 16);
      var textH = measureTextHeight(ctx, traits[i], textMaxW, 19, 3);
      var chipH = Math.max(textH + 32, 58);
      var chipY = cy + row * 86;

      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#F2F2F7';
      ctx.lineWidth = 2;
      roundRect(ctx, chipX, chipY, chipW, chipH, 18);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#3A3A3C';
      ctx.font = '13px -apple-system, "PingFang SC", sans-serif';
      ctx.textAlign = 'left';
      drawText(ctx, traits[i], chipX + 14, chipY + 17, textMaxW, 19, 3);
    }
    cy += rows * 86 + 24;
  }

  // Section: 性格分析
  var colW = (CARD_W - PAD * 2 - 20) / 2;
  var col2X = PAD + colW + 20;
  var strList = (data.strengths || []).slice(0, 3);
  var weakList = (data.weaknesses || []).slice(0, 3);
  var hasStr = strList.length > 0;
  var hasWeak = weakList.length > 0;

  if (hasStr || hasWeak) {
    drawSecTitle(ctx, '性格分析', PAD, cy);
    cy += 28;

    var itemH = 44;
    var colH = Math.max(46 + strList.length * itemH, 46 + weakList.length * itemH);

    if (hasStr) {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#F2F2F7';
      ctx.lineWidth = 2;
      roundRect(ctx, PAD, cy, colW, colH, 22);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1C1C1E';
      ctx.font = 'bold 15px -apple-system, "PingFang SC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('性格优点', PAD + 18, cy + 26);
      for (var j = 0; j < strList.length; j++) {
        var iy = cy + 48 + j * itemH;
        ctx.fillStyle = '#1C1C1E';
        ctx.font = 'bold 13px -apple-system, "PingFang SC", sans-serif';
        ctx.fillText(strList[j].title || '', PAD + 18, iy);
        var desc = (strList[j].desc || '');
        if (desc.length > 12) desc = desc.slice(0, 12) + '…';
        ctx.fillStyle = '#8E8E93';
        ctx.font = '11px -apple-system, "PingFang SC", sans-serif';
        ctx.fillText(desc, PAD + 18, iy + 18);
      }
    }

    if (hasWeak) {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#F2F2F7';
      ctx.lineWidth = 2;
      roundRect(ctx, col2X, cy, colW, colH, 22);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1C1C1E';
      ctx.font = 'bold 15px -apple-system, "PingFang SC", sans-serif';
      ctx.fillText('性格缺点', col2X + 18, cy + 26);
      for (var k = 0; k < weakList.length; k++) {
        var iy2 = cy + 48 + k * itemH;
        ctx.fillStyle = '#1C1C1E';
        ctx.font = 'bold 13px -apple-system, "PingFang SC", sans-serif';
        ctx.fillText(weakList[k].title || '', col2X + 18, iy2);
        var desc2 = (weakList[k].desc || '');
        if (desc2.length > 12) desc2 = desc2.slice(0, 12) + '…';
        ctx.fillStyle = '#8E8E93';
        ctx.font = '11px -apple-system, "PingFang SC", sans-serif';
        ctx.fillText(desc2, col2X + 18, iy2 + 18);
      }
    }
    cy += colH + 24;
  }

  // Section: 职业偏好
  var careers = data.careerList || [];
  if (careers.length > 0) {
    drawSecTitle(ctx, '职业偏好', PAD, cy);
    cy += 28;
    var tcY = cy, tcX = PAD;
    ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
    var tagMaxW = CARD_W - PAD;
    for (var i = 0; i < careers.length; i++) {
      var tw = ctx.measureText(careers[i]).width + 28;
      if (tcX + tw > tagMaxW && tcX > PAD) {
        tcX = PAD;
        tcY += 36;
      }
      var actualW = Math.min(tw, tagMaxW - PAD);
      ctx.fillStyle = i % 2 === 0 ? '#1C1C1E' : '#F2F2F7';
      roundRect(ctx, tcX, tcY, actualW, 28, 14);
      ctx.fill();
      ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#3A3A3C';
      ctx.textAlign = 'left';
      var displayText = tw > tagMaxW - PAD ? careers[i].slice(0, 8) + '…' : careers[i];
      ctx.fillText(displayText, tcX + 14, tcY + 18);
      tcX += actualW + 10;
    }
    cy = tcY + 44;

    // Avoid + Dev tip
    var avoidText = data.careerAvoid || '';
    var tipText = data.careerDevTip || '';
    if (avoidText || tipText) {
      var noteMaxW = CARD_W - PAD * 2 - 40;
      var avoidLines = avoidText ? wrapText(ctx, '⚠ ' + avoidText, noteMaxW) : [];
      var tipLines = tipText ? wrapText(ctx, '💡 ' + tipText, noteMaxW) : [];
      if (avoidLines.length > 3) avoidLines = avoidLines.slice(0, 3);
      if (tipLines.length > 3) tipLines = tipLines.slice(0, 3);
      var noteH = (avoidLines.length || 1) * 20 + (tipLines.length || 1) * 20 + 40;

      ctx.fillStyle = '#FFF9F0';
      roundRect(ctx, PAD, cy, CARD_W - PAD * 2, noteH, 16);
      ctx.fill();
      ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
      ctx.textAlign = 'left';
      for (var a = 0; a < avoidLines.length; a++) {
        ctx.fillStyle = '#8E6F3E';
        ctx.fillText(avoidLines[a], PAD + 20, cy + 24 + a * 20);
      }
      var tipStartY = cy + 24 + (avoidLines.length || 1) * 20 + 8;
      for (var b = 0; b < tipLines.length; b++) {
        ctx.fillStyle = '#4A6FA5';
        ctx.fillText(tipLines[b], PAD + 20, tipStartY + b * 20);
      }
      cy += noteH + 20;
    }
  }

  // Section: 社交与成长
  var socialText = data.social || '';
  var growthText = data.growthText || '';
  if (socialText || growthText) {
    drawSecTitle(ctx, '社交与成长', PAD, cy);
    cy += 28;

    var sgMaxW = colW - 36;
    var socialH = socialText ? measureTextHeight(ctx, socialText, sgMaxW, 18, 4) : 0;
    var growthH = growthText ? measureTextHeight(ctx, growthText, sgMaxW, 18, 4) : 0;
    var sgBoxH = Math.max(socialH + 66, growthH + 66, 100);

    if (socialText) {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#F2F2F7';
      ctx.lineWidth = 2;
      roundRect(ctx, PAD, cy, colW, sgBoxH, 22);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1C1C1E';
      ctx.font = 'bold 15px -apple-system, "PingFang SC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('社交与人际', PAD + 18, cy + 28);
      ctx.fillStyle = '#636366';
      ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
      drawText(ctx, socialText, PAD + 18, cy + 50, sgMaxW, 18, 4);
    }

    if (growthText) {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#F2F2F7';
      ctx.lineWidth = 2;
      roundRect(ctx, col2X, cy, colW, sgBoxH, 22);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#1C1C1E';
      ctx.font = 'bold 15px -apple-system, "PingFang SC", sans-serif';
      ctx.fillText('成长建议', col2X + 18, cy + 28);
      ctx.fillStyle = '#636366';
      ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
      drawText(ctx, growthText, col2X + 18, cy + 50, sgMaxW, 18, 4);
    }
    cy += sgBoxH + 30;
  }

  // Footer
  cy += 6;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#C7C7CC';
  ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
  ctx.fillText('知聊 · MBTI 对话测试', cx, cy);
  ctx.fillStyle = '#EAEAEA';
  ctx.font = '10px -apple-system, "PingFang SC", sans-serif';
  ctx.fillText('AI 测试结果仅供参考', cx, cy + 20);

  return cy + 56;
}

function drawSecTitle(ctx, title, x, y) {
  ctx.fillStyle = '#1C1C1E';
  ctx.beginPath();
  ctx.arc(x, y + 4, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#8E8E93';
  ctx.font = '12px -apple-system, "PingFang SC", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(title, x + 16, y + 8);
}

// ── Generate (uses offscreen canvas to avoid CSS/buffer conflicts) ──

function generateShareCard(page, data, selector, cardType) {
  return new Promise(function (resolve, reject) {
    var maxH = cardType === 'fullreport' ? 3000 : 1000;

    // Use offscreen canvas — no CSS, no DOM, pure pixel buffer
    var canvas = wx.createOffscreenCanvas({
      type: '2d',
      width: CARD_W,
      height: maxH
    });
    var ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = cardType === 'fullreport' ? '#FFFFFF' : '#1C1C1E';
    ctx.fillRect(0, 0, CARD_W, maxH);

    // Draw content at 1:1 pixel mapping
    var actualH = cardType === 'fullreport'
      ? drawFullReportCard(ctx, data)
      : drawResultCard(ctx, data);

    var cropH = Math.ceil(actualH);

    wx.canvasToTempFilePath({
      canvas: canvas,
      x: 0,
      y: 0,
      width: CARD_W,
      height: cropH,
      destWidth: CARD_W,
      destHeight: cropH,
      success: function (result) {
        resolve(result.tempFilePath);
      },
      fail: function (err) {
        console.error('[share-card] export failed:', err);
        // Fallback: try exporting full canvas without cropping
        wx.canvasToTempFilePath({
          canvas: canvas,
          success: function (r2) { resolve(r2.tempFilePath); },
          fail: reject
        });
      }
    });
  });
}

module.exports = { drawResultCard, drawFullReportCard, generateShareCard };
